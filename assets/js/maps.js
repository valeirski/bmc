function initMap() {
  definePopupClass();

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.174395, lng: 5.206047},
    zoom: 14,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: [
      {
        "stylers": [
            {
                "hue": "#2c3e50"
            },
            {
                "saturation": 250
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 50
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
  });

  popup = new Popup(
        new google.maps.LatLng(51.174395, 5.206047),
        document.getElementById('content'));
    popup.setMap(map);
}

function definePopupClass() {
  Popup = function(position, content) {
    this.position = position;

    content.classList.add('popup-bubble-content');

    var pixelOffset = document.createElement('div');
    pixelOffset.classList.add('popup-bubble-anchor');
    pixelOffset.appendChild(content);

    this.anchor = document.createElement('div');
    this.anchor.classList.add('popup-tip-anchor');
    this.anchor.appendChild(pixelOffset);

    this.stopEventPropagation();
  };

  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.anchor);
  };

  Popup.prototype.onRemove = function() {
    if (this.anchor.parentElement) {
      this.anchor.parentElement.removeChild(this.anchor);
    }
  };

  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.anchor.style.left = divPosition.x + 'px';
      this.anchor.style.top = divPosition.y + 'px';
    }
    if (this.anchor.style.display !== display) {
      this.anchor.style.display = display;
    }
  };

  Popup.prototype.stopEventPropagation = function() {
    var anchor = this.anchor;
    anchor.style.cursor = 'auto';

    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
     'pointerdown']
        .forEach(function(event) {
          anchor.addEventListener(event, function(e) {
            e.stopPropagation();
          });
        });
  };
}
