using System;
using System.Collections.Generic;
using CURD_API.Entity;
using Microsoft.EntityFrameworkCore;

namespace CURD_API.DAL;

public partial class StudentManagementDbContext : DbContext
{
    public StudentManagementDbContext()
    {
    }

    public StudentManagementDbContext(DbContextOptions<StudentManagementDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {

        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.S_Id).HasName("PK__Student__A3DFF08D492D5829");

            entity.ToTable("Student");

            entity.Property(e => e.S_Id).HasColumnName("S_Id");
            entity.Property(e => e.S_Name)
                .HasMaxLength(100)
                .HasColumnName("S_Name");
            entity.Property(e => e.S_Email)
                .HasMaxLength(100)
                .HasColumnName("S_Email");
            entity.Property(e => e.S_Age).HasColumnName("S_Age");
            entity.Property(e => e.S_Class)
                .HasMaxLength(100)
                .HasColumnName("S_Class");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
