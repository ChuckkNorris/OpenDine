using Microsoft.EntityFrameworkCore;

namespace OpenDine.Api.Modules.Common.Entities
{
    public class OpenDineContext : DbContext
    {
        public OpenDineContext(DbContextOptions dbOptions) : base(dbOptions)
        {
        }

        public DbSet<Restaurant> Restaurants => Set<Restaurant>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // To avoid plural DB table names inferred from DbSet names
            modelBuilder.Entity<Restaurant>().ToTable("Restaurant");
            // .HasIndex(superhero => superhero.Name)
            // .IsUnique();

            // NOTE: See Restaurant.cs for index defined with data annotations
            //modelBuilder.Entity<SuperheroSuperpower>().ToTable("SuperheroSuperpower")
            //    .HasKey(join => new { join.SuperheroId, join.SuperpowerId });
        }

    }
}
