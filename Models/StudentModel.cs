using System;
using System.Collections.Generic;

namespace CURD_API.Models;

public partial class StudentModel
{
    public int SId { get; set; }

    public string SName { get; set; } = null!;

    public string SEmail { get; set; } = null!;

    public int SAge { get; set; }

    public string SClass { get; set; } = null!;
}
