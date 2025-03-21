import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  icon,
  latLng,
  LeafletMouseEvent,
  Marker,
  marker,
  MarkerOptions,
  tileLayer,
} from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { ICoordenadas } from './interfaces/coordenada';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss',
})
export class MapaComponent implements OnInit {
  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      const marcador = marker(
        [valor.latitud, valor.longitud],
        this.markerOptions
      );

      if (valor.texto) {
        marcador.bindPopup(valor.texto, { autoClose: false, autoPan: false });
      }

      return marcador;
    });
  }

  @Input()
  soloLectura = false;

  @Input()
  coordenadasIniciales: ICoordenadas[] = [];

  @Output()
  coordenadaSeleccionada = new EventEmitter<ICoordenadas>();

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 14,
    center: latLng(18.47318704338643, -69.93441088477327), //latLng(40.702897267645426, -73.69643144060487),
  };

  markerOptions: MarkerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
    }),
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent) {
    if (this.soloLectura) {
      return;
    }

    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;

    this.capas = [];
    this.capas.push(marker([latitud, longitud], this.markerOptions));
    this.coordenadaSeleccionada.emit({ latitud, longitud });
  }
}

// 40.702897267645426, -73.69643144060487
