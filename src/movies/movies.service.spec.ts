import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return an array', () => {
      const movies = service.getMovies();
      expect(movies).toBeInstanceOf(Array);
    });
  });

  describe('getMovie', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        director: 'tester',
        year: 2021,
        genres: ['test'],
      });
      const movie = service.getMovie(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Movie ID 999');
      }
    });
  });

  describe('deleteMovie', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        director: 'tester',
        year: 2021,
        genres: ['test'],
      });
      const beforeDeleteLength = service.getMovies().length;
      service.deleteMovie(1);
      const afterDeleteLength = service.getMovies().length;

      expect(afterDeleteLength).toBeLessThan(beforeDeleteLength);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Movie ID 999');
      }
    });
  });

  describe('createMovie', () => {
    it('should carete a movie', () => {
      const beforeCreateLength = service.getMovies().length;
      service.createMovie({
        title: 'Test Movie',
        director: 'tester',
        year: 2021,
        genres: ['test'],
      });
      const afterCreateLength = service.getMovies().length;

      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        director: 'tester',
        year: 2021,
        genres: ['test'],
      });

      service.updateMovie(1, { year: 2022 });
      const movie = service.getMovie(1);

      expect(movie.year).toEqual(2022);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.updateMovie(999, { year: 2022 });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Movie ID 999');
      }
    });
  });
});
