import { Injectable } from '@angular/core';
import { Movie } from '../models/movies';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  movies: Movie[] = [];

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(`${environment.api}/entities`);
  }

  addMovie(movie: Movie) {
    return this.http.post<Movie>(`${environment.api}/entities`, movie);
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(`${environment.api}/entities/${id}`);
  }

  updateMovie(id: string, movie: Movie) {
    return this.http.put<Movie>(`${environment.api}/entities/${id}`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete<any>(`${environment.api}/entities/${id}`);
  }
}
