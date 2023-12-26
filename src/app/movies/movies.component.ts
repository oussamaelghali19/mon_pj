import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movies';
import { MovieServiceService } from '../services/movie-service.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];

  constructor(private moviesService: MovieServiceService) {}

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe(() => {
      this.getAllMovies();
    });
  }

  getAllMovies() {
    this.moviesService.getMovies().subscribe((res) => {
      this.movies = res;
    });
  }

  ngOnInit(): void {
    this.getAllMovies();
  }
}
