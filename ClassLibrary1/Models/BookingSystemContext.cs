﻿using System;
using System.Collections.Generic;
using BookingSystem.core.Models.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace startup.Models
{
    public partial class BookingSystemContext : IdentityDbContext<AUser, Role, Guid>
    {
        public BookingSystemContext()
        {
        }

        public BookingSystemContext(DbContextOptions<BookingSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Companies { get; set; } = null!;
        public virtual DbSet<Reservation> Reservations { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<AUser> AUsers { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-IQGVBR7N\\SQLEXPRESS;Database=BookingSystem;Trusted_Connection=True;Encrypt=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(builder);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Company");

                entity.Property(e => e.CompanyId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("companyId");

                entity.Property(e => e.Active).HasColumnName("active");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Logo).HasColumnName("logo");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.ToTable("Reservation");

                entity.Property(e => e.ReservationId)
                     .ValueGeneratedOnAdd()
                    .HasColumnName("reservationId");

                entity.Property(e => e.EndTime)
                    .HasColumnType("datetime")
                    .HasColumnName("endTime");

                entity.Property(e => e.MeetingStatus).HasColumnName("meetingStatus");

                entity.Property(e => e.NumberOfAttendees).HasColumnName("numberOfAttendees");

                entity.Property(e => e.RoomId).HasColumnName("roomId");

                entity.Property(e => e.StartTime)
                    .HasColumnType("datetime")
                    .HasColumnName("startTime");

                //entity.Property(e => e.AUserId).HasColumnName("userId");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.RoomId)
                    .HasConstraintName("FK__Reservati__roomI__4CA06362");

                entity.HasOne(d => d.AUser)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.AUserId)
                    .HasConstraintName("FK__Reservati__userI__4D94879B");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Room");

                entity.Property(e => e.RoomId)
                     .ValueGeneratedOnAdd()
                    .HasColumnName("roomId");

                entity.Property(e => e.Capacity).HasColumnName("capacity");

                entity.Property(e => e.CompanyId).HasColumnName("companyId");

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Location)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("location");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Rooms)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK__Room__companyId__49C3F6B7");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.UserId)
                     .ValueGeneratedOnAdd()
                    .HasColumnName("userId");

                entity.Property(e => e.CompanyId).HasColumnName("companyId");

                entity.Property(e => e.DateOfBirth)
                    .HasColumnType("date")
                    .HasColumnName("dateOfBirth");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("gender");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("password")
                    .IsFixedLength();

                entity.Property(e => e.Role)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("role");

                
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}