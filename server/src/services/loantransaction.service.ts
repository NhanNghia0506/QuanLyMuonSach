import CreateLoanTransactionDto from "../dtos/create.loantransaction.dto";
import UpdateLoanTransactionDto from "../dtos/update.loantransaction.dto";
import Book from "../models/book.model";
import Reader from "../models/reader.model";
import bookRepository from "../repositories/book.repository";
import loantransactionRepository from "../repositories/loantransaction.repository";

export interface LoanTransactionSearchQuery {
  reader?: string;
  book?: string;
  status?: string;
  from?: string;
  to?: string;
  page?: string;
  limit?: string;
}

class LoanTransactionService {
    private today: Date
    constructor() {
        this.today = new Date()
        this.today.setHours(0, 0, 0, 0);
    }
    async loanReservation(data: CreateLoanTransactionDto, readerId: string) {
        const book = await bookRepository.findById(data.bookId)
        
        // nếu sách không tồn tại
        if(!book) {
            throw new Error('Sách này không tồn tại')
        } else {
            if(book?.quantity! == 0) {
              throw new  Error('Số lượng sách đã hết')
            }
            const dto = {
                ...data,
                status: 'Chờ được duyệt',
                readerId,
            } as CreateLoanTransactionDto
            return await loantransactionRepository.loanReservation(dto);
        }
    }

    async findById(id: string) {
        return await loantransactionRepository.findById(id);
    }

    async approveLoanTransaction(loanId: string, staffId: string) {
        const loanTrans = await loantransactionRepository.findById(loanId);
        const book = await bookRepository.findById(loanTrans?.bookId.toString()!)

        const totalsBorrowed = await loantransactionRepository.getBorrowedCount(loanTrans?.bookId.toString()!)
        console.log('totalsBorrowed', totalsBorrowed);
        // Nếu số lượng sách đã hết 
        if(book?.quantity! == 0) {
            throw new Error('Số lượng sách đã hết')
        }

        const status = 'Được duyệt'
        const data = {
            staffId,
            status,
            approvedAt: this.today 
        } as UpdateLoanTransactionDto;
        return await loantransactionRepository.update(loanId, data);
    }

    private addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Hàm chuyển đổi trạng thái khi đọc giả lại lấy sách sau khi đăng kí mượn được duyệt
    async checkOutLoan(loanId: string) {
        const loanTrans = await loantransactionRepository.findById(loanId);
        if(!loanTrans) {
            throw new Error('Phiếu mượn này không tồn tại');
        }
        const borrowedAt = this.today // ngày mượn
        const dueAt = this.addDays(borrowedAt, 15); // hạn trả
        const data = {
            borrowedAt,
            status: 'Đang mượn',
            dueAt
        } as UpdateLoanTransactionDto

        // giam so luon sach
        const book = await bookRepository.findById(loanTrans?.bookId.toString()!)

        await bookRepository.update(loanTrans?.bookId.toString()!, { quantity: book!.quantity - 1 })

        return await loantransactionRepository.update(loanId, data);
    }

    async filter(query: LoanTransactionSearchQuery) {
        const {
            reader,
            book,
            status,
            from,
            to,
        } = query;

        const filter: Record<string, any> = {}

        // 1. Lọc theo trạng thái
        if (status) {
            filter.status = status;
        }

        if (from || to) {
            filter.borrowedAt = {};
            if (from) filter.borrowedAt.$gte = new Date(from);
            if (to) filter.borrowedAt.$lte = new Date(to);
        }

        if(book) {
            // Tìm tất cả sách có tên chứa 'book'
            const matchedBooks = await Book.find({
                name: { $regex: book, $options: "i" }
            }).select("_id");

            const bookIds = matchedBooks.map(b => b.id); // dùng _id, không phải b.id
            filter.bookId = { $in: bookIds }; 
        }

        if(reader) {
            // Tìm tất cả các readerId khớp với tên này
            const matchedReaders = await Reader.find({ 
                name: { $regex: reader, $options: "i" } 
            }).select("_id");

            const readerIds = matchedReaders.map(r => r.id);
            filter.readerId = { $in: readerIds };
        }

        return await loantransactionRepository.filter(filter)

    }
    
    //Hàm chuyển đổi trạng thái khi đọc giả lại trả sách
    async returnBook(loanId: string) {
    // 1. Lấy giao dịch mượn
    const loanTrans = await loantransactionRepository.findById(loanId);
    if (!loanTrans) {
        throw new Error('Phiếu mượn này không tồn tại');
    }

    // 2. Lấy thông tin sách
    const book = await bookRepository.findById(loanTrans.bookId.toString());
    if (!book) {
        throw new Error('Sách không tồn tại');
    }

    // 3. Tính phí phạt nếu trả quá hạn
    let fine = 0;
    if (loanTrans.dueAt) {
        const today = new Date(this.today);
        const dueDate = new Date(loanTrans.dueAt);
        if (today > dueDate) {
            const diffTime = today.getTime() - dueDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            fine = diffDays * 15000; // 15.000 VND / ngày
            console.log(`Trả sách trễ ${diffDays} ngày, phí phạt: ${fine} VND`);
        }
    }

    // 4. Cập nhật phiếu mượn
    const data =  {
        returnedAt: this.today,
        status: 'Đã trả',
        fine, // thêm phí phạt
    } as UpdateLoanTransactionDto;

    // 5. Cộng lại số lượng sách
    await bookRepository.update(book.id, { quantity: book.quantity + 1 });

    // 6. Cập nhật giao dịch mượn
    return await loantransactionRepository.update(loanId, data);
}

    
    async getLoanTransactions(readerId?: string) {
        if(readerId) {
            return await loantransactionRepository.findByReaderId(readerId);
        }
        return await loantransactionRepository.findAll();
    }
}

export default new LoanTransactionService()