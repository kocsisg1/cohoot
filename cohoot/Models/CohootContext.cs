using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace cohoot.Models;

public partial class CohootContext : DbContext
{
    public CohootContext()
    {
    }

    public CohootContext(DbContextOptions<CohootContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Felhasznalok> Felhasznaloks { get; set; }

    public virtual DbSet<Pontok> Pontoks { get; set; }

    public virtual DbSet<Quiz> Quizzes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=cohoot;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Felhasznalok>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("felhasznalok");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Email).HasMaxLength(64);
            entity.Property(e => e.FelhasznaloNev).HasMaxLength(64);
            entity.Property(e => e.Hash)
                .HasMaxLength(64)
                .HasColumnName("HASH");
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("SALT");
        });

        modelBuilder.Entity<Pontok>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("pontok");

            entity.HasIndex(e => e.FelhasznaloId, "FelhasznaloId").IsUnique();

            entity.HasIndex(e => e.FelhasznaloId, "FelhasznaloId_2").IsUnique();

            entity.HasIndex(e => e.FelhasznaloId, "FelhasznaloId_3");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.FelhasznaloId).HasColumnType("int(11)");
            entity.Property(e => e.FilmPont).HasColumnType("int(11)");
            entity.Property(e => e.FoldrajzPont).HasColumnType("int(11)");
            entity.Property(e => e.MatematikaPont).HasColumnType("int(11)");
            entity.Property(e => e.TortenelemPont).HasColumnType("int(11)");

            entity.HasOne(d => d.Felhasznalo).WithOne(p => p.Pontok)
                .HasForeignKey<Pontok>(d => d.FelhasznaloId)
                .HasConstraintName("pontok_ibfk_1");
        });

        modelBuilder.Entity<Quiz>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("quiz");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Helyes).HasColumnType("int(11)");
            entity.Property(e => e.Kategoria).HasMaxLength(64);
            entity.Property(e => e.Kerdes).HasMaxLength(64);
            entity.Property(e => e.Valasz1).HasMaxLength(64);
            entity.Property(e => e.Valasz2).HasMaxLength(64);
            entity.Property(e => e.Valasz3).HasMaxLength(64);
            entity.Property(e => e.Valasz4).HasMaxLength(64);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
