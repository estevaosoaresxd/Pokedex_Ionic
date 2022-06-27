import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any;
  slideOptions = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  }

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.pokemonService.getPokeDetails(index).subscribe( details => {
      this.details = details
    })
  }

}
