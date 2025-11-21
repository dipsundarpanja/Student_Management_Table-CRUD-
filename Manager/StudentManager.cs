using CRUD_API.Data;
using CURD_API.DAL;
using CURD_API.Entity;

namespace CURD_API.Manager
{
    public class StudentManager
    {
        private readonly StudentRepo _Repo;

        public StudentManager(StudentRepo repo)
        {
            _Repo = repo;
        }

        public async Task<int> CreateTheProduct(Student student)
        {
            return await _Repo.CreateTheProduct(student);
        }
        public async Task<int> DeleteTheProduct(int id)
        {
            return await _Repo.DeleteTheProduct(id);
        }
        public async Task<List<Student>> GetAllProducts()
        {
            return await _Repo.GetAllProducts();
        }
        public async Task<Student?> GetTheProductId(int id)
        {
            return await _Repo.GetTheProductId(id);
        }
        public async Task<int> UpdateTheProduct(Student student)
        {
            return await _Repo.UpdateTheProduct(student);
        }
    }
}
