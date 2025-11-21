using CURD_API.Entity;
using CURD_API.Manager;
using Microsoft.AspNetCore.Mvc;

namespace CURD_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly StudentManager _Manager;

        public StudentController(StudentManager manager)
        {
            _Manager = manager;
        }

        // GET: api/student
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var data = await _Manager.GetAllProducts();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving students", error = ex.Message });
            }
        }

        // GET: api/student/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var data = await _Manager.GetTheProductId(id);
                if (data == null)
                {
                    return NotFound(new { message = $"Student with ID {id} not found" });
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving student", error = ex.Message });
            }
        }

        // POST: api/student
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Student student)
        {
            // Log the received data for debugging
            if (student == null)
            {
                return BadRequest(new { message = "Student object is null" });
            }

            // Remove s_Id from ModelState validation since it's auto-generated
            ModelState.Remove("s_Id");
            ModelState.Remove("S_Id");
            ModelState.Remove("Id");

            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "Validation failed",
                    errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
                });
            }

            try
            {
                // Ensure s_Id is 0 or default for auto-generation
                student.S_Id = 0;

                await _Manager.CreateTheProduct(student);
                return CreatedAtAction(nameof(GetById), new { id = student.S_Id }, student);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating student", error = ex.Message });
            }
        }

        // PUT: api/student/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Student student)
        {
            if (id != student.S_Id)
            {
                return BadRequest(new { message = "ID mismatch" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existing = await _Manager.GetTheProductId(id);
                if (existing == null)
                {
                    return NotFound(new { message = $"Student with ID {id} not found" });
                }

                await _Manager.UpdateTheProduct(student);
                return Ok(new { message = "Student updated successfully", data = student });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating student", error = ex.Message });
            }
        }

        // DELETE: api/student/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var data = await _Manager.GetTheProductId(id);
                if (data == null)
                {
                    return NotFound(new { message = $"Student with ID {id} not found" });
                }

                await _Manager.DeleteTheProduct(id);
                return Ok(new { message = "Student deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting student", error = ex.Message });
            }
        }
    }
}
