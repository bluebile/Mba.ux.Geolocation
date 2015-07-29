Ext.define('Mba.ux.Geolocation', {
    extend: 'Ext.Evented',
    requires: [
        'Ext.util.DelayedTask',
        'Mba.ux.Geolocation.view.Map',
        'Ext.device.Connection'
    ],
    singleton: true,
    loaded: false,

    config: {
        callbackAfterLoad: null,
        scripts: []
    },

    initialize: function()
    {
        this.callParent();
        document.addEventListener('resume', Ext.Function.bind(this.loadMap, this), false);
        var me = this,
            task = Ext.create('Ext.util.DelayedTask', function() {
                this.loadMap();
            },
            me
        );

        task.delay(100);
    },

    isLoaded: function()
    {
        return this.loaded;
    },

    loadMap: function()
    {
        if (!Ext.device.Connection.isOnline()) {
            return false;
        }

        var url = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&language=pt_BR&callback=Mba.ux.Geolocation.mapLoaded';
        if (!Ext.Loader.scriptElements[url]) {
            Ext.Loader.loadScriptFile(url);
            return true;
        }

        return false;
    },

    mapLoaded: function()
    {
        if (Ext.isArray(this.getScripts())) {
            Ext.each(this.getScripts(), function(value) {
                Ext.Loader.loadScriptFile(value);
            });
        }

        this.loaded = true;

        if (Ext.isFunction(this.getCallbackAfterLoad())) {
            this.getCallbackAfterLoad()();
        }
    }
});
