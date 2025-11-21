using System.ComponentModel.DataAnnotations;

namespace CURD_API.Entity
{
    public class Student
    {
        [Key]
        public int S_Id { get; set; }
        public string S_Name { get; set; }
        public string S_Email { get; set; }
        public int S_Age { get; set; }
        public string S_Class { get; set; }
    }
}
