import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '../services/movie-service.service';
import { Movie } from '../models/movies';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css'],
})
export class UpdateMovieComponent implements OnInit {
  myForm!: FormGroup;
  movieId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MovieServiceService
  ) {
    this.myForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
  }

  updateMovie() {
    const movie: Movie = this.myForm.value;

    this.moviesService.updateMovie(this.movieId, movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    if (this.movieId) {
      let movie = this.moviesService
        .getMovieById(this.movieId)
        .subscribe((res) => {
          this.myForm.get('title')?.setValue(res.title);
          this.myForm.get('description')?.setValue(res.description);
        });
    }
  }
}
