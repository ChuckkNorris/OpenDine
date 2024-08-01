﻿using Microsoft.EntityFrameworkCore;

namespace OpenDine.Api.Modules.Common.Entities
{
    public class OpenDineContext : DbContext
    {
        public OpenDineContext(DbContextOptions dbOptions) : base(dbOptions)
        {
        }

        public DbSet<Restaurant> Restaurants => Set<Restaurant>();
        public DbSet<RestaurantLocation> RestaurantLocations => Set<RestaurantLocation>();
        public DbSet<Menu> Menus => Set<Menu>();
        public DbSet<MenuItem> MenuItems => Set<MenuItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // To avoid plural DB table names inferred from DbSet names
            modelBuilder.Entity<Restaurant>().ToTable("Restaurant");
            modelBuilder.Entity<RestaurantLocation>().ToTable("RestaurantLocation");
            modelBuilder.Entity<Menu>().ToTable("Menu");
            modelBuilder.Entity<MenuItem>().ToTable("MenuItem");
            // .HasIndex(superhero => superhero.Name)
            // .IsUnique();

            // NOTE: See Restaurant.cs for index defined with data annotations
            //modelBuilder.Entity<SuperheroSuperpower>().ToTable("SuperheroSuperpower")
            //    .HasKey(join => new { join.SuperheroId, join.SuperpowerId });
        }

        // Override all SaveChanges functions to ensure metadata is always set
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            SetEntityMetaData();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            SetEntityMetaData();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        /// <summary>
        /// Sets Created/Modified metadata on entities when created or updated
        /// </summary>
        public void SetEntityMetaData()
        {
            var utcNow = DateTime.UtcNow;
            var addedEntries = ChangeTracker.Entries()
                .Where(entry => entry.State == EntityState.Added && entry.Entity is BaseEntity)
                .ToList();
            addedEntries.ForEach(entry =>
            {
                entry.Property(nameof(BaseEntity.CreatedOn)).CurrentValue = utcNow;
                entry.Property(nameof(BaseEntity.ModifiedOn)).CurrentValue = utcNow;
            });
            var modifiedEntries = ChangeTracker.Entries()
                .Where(entry => entry.State == EntityState.Modified && entry.Entity is BaseEntity)
                .ToList();
            modifiedEntries.ForEach(entry =>
            {
                entry.Property(nameof(BaseEntity.ModifiedOn)).CurrentValue = utcNow;
            });

        }

    }
}
