using CURD_API.Entity;

namespace CURD_API.DAL
{
    public interface IStudent
    {
        Task<List<Student>> GetAllProducts();
        Task<Student> GetTheProductId(int id);
        Task<int> CreateTheProduct(Student product);
        Task<int> UpdateTheProduct(Student product);
        Task<int> DeleteTheProduct(int id);
    }
}
