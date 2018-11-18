import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  markers: Marker[] = [
    {
      lat: 40.5817815,
      lng: -122.3559081,
      name: 'Planet Fitness',
      draggable: false,
    },
    {
      lat: 40.5571184,
      lng: -122.3067689,
      name: 'Sun Oaks Tennis and Fitness',
      draggable: false,
    },
    {
      lat: 40.5840854,
      lng: -122.3749692,
      name: 'Shasta Athletic Club',
      draggable: false,
    },
    {
      lat: 40.5813204,
      lng: -122.3930377,
      name: 'Align',
      draggable: false,
    },
    {
      lat: 40.5732405,
      lng: -122.3748009,
      name: 'Monster Fitness',
      draggable: false,
    },
    {
      lat: 40.5371596,
      lng: -122.3476851,
      name: 'Anytime Fitness',
      draggable: false,
    },
    {
      lat: 40.5672764,
      lng: -122.362331,
      name: 'CrossFit Redding',
      draggable: false,
    },
    {
      lat: 40.5769914,
      lng: -122.3749163,
      name: 'Everday Fitness and Training',
      draggable: false,
    },
  ];
  // initial position for map - Redding, California
  lat = 40.583333;
  lng = -122.366667;
  // google maps zoom level
  zoom = 13;



  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}

// an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  name: string;
  draggable: boolean;
}



/*onLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }*/

/*mapClicked($event: MouseEvent) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: false,
      });
*/
