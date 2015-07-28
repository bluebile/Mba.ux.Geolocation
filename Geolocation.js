Ext.define('Mba.ux.Geolocation', {
    extend: 'Ext.Evented',
    requires: [
        'Ext.util.DelayedTask',
        'Mba.ux.Geolocation.view.Map',
        'Ext.device.Connection'
    ],
    singleton: true,
    mapsCarregado: false,

    config: {
        mapsCarregando: false,
        mapaControllerCarregado: false
    },

    initialize: function()
    {
        this.callParent();
        document.addEventListener('resume', Ext.Function.bind(this.verifyMapLoaded, this), false);
        this.setMapaControllerCarregado(true);
        var me = this,
            task = Ext.create('Ext.util.DelayedTask', function() {
                this.loadMap();
            },
            me
        );

        task.delay(100);
    },

    verifyMapLoaded: function()
    {
        if (this.mapsCarregado || (this.getMapaControllerCarregado() && !this.getMapsCarregado())) {
            this.loadMap();
        }
    },

    loadMap: function()
    {
        if (Ext.device.Connection.isOnline()) {
            return false;
        }
        if(document.getElementById('scriptMap')) {
            return true;
        }
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'scriptMap';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&language=pt_BR&callback=Mba.ux.Geolocation.mapLoaded';
        document.body.appendChild(script);
        return true;

    },

    mapLoaded: function()
    {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'vendor/ux/Mba.ux.Geolocation/resources/markercluster.js';
        document.body.appendChild(script);

        this.mapsCarregado = true;
        //Talvez alguma ação aqui.
    }
});
