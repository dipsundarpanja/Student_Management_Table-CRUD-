
using CURD_API.DAL;
using CURD_API.Entity;
using Microsoft.EntityFrameworkCore;

namespace CRUD_API.Data
{
    public class StudentRepo : IStudent
    {
        private readonly StudentManagementDbContext _context;

        public StudentRepo(StudentManagementDbContext context)
        {
            _context = context;
        }

        // ✅ CREATE student using stored procedure
        public async Task<int> CreateTheProduct(Student student)
        {
            return await _context.Database.ExecuteSqlRawAsync(
                "EXEC SP_AddStudent @S_Name = {0}, @S_Email = {1}, @S_Age = {2}, @S_Class = {3}",
                student.S_Name,
                student.S_Email,
                student.S_Age,
                student.S_Class
            );
        }

        // ✅ DELETE student by ID
        public async Task<int> DeleteTheProduct(int id)
        {
            return await _context.Database.ExecuteSqlRawAsync(
                "EXEC DeleteData @S_Id = {0}", id
            );
        }

        // ✅ READ all students
        public async Task<List<Student>> GetAllProducts()
        {
            return await _context.Students
                .FromSqlRaw("EXEC SpAlltheStudent")
                .ToListAsync();
        }

        // ✅ READ student by ID
        public async Task<Student?> GetTheProductId(int id)
        {
            var result = await _context.Students
                .FromSqlRaw("EXEC GetStudentById @S_Id = {0}", id)
                .ToListAsync();

            return result.FirstOrDefault();
        }

        // ✅ UPDATE student details
        public async Task<int> UpdateTheProduct(Student student)
        {
            return await _context.Database.ExecuteSqlRawAsync(
                "EXEC SP_UpdateDetails @S_Id = {0}, @S_Name = {1}, @S_Email = {2}, @S_Age = {3}, @S_Class = {4}",
                student.S_Id,
                student.S_Name,
                student.S_Email,
                student.S_Age,
                student.S_Class
            );
        }
    }
}
