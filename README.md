# Plugin para o carregamento e utilização do Google Maps com o Sencha Touch


## Utilização

```js
Ext.application({
    ...

    requires: [
        ...
        'Mba.ux.Environment.overrides.*',
        'Mba.ux.Map'
        ...
    ],

    launch: function() {
        ...

        //Variável google ainda não carregou!
        // Ext.create('Mba.ux.Map', {
        //     mapOptions: {
        //         center: new google.maps.LatLng(this.getLatitude(), this.getLongitude()),
        //         zoom: 4,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         mapTypeControl: false,
        //         streetViewControl: false,
        //         overviewMapControl: false,
        //         zoomControl: Ext.os.deviceType === 'Desktop' ? true: false
        //     }
        // });

        ...

 	}
```

## Contato

<info@bluebile.com>