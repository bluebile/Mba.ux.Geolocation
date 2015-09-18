Ext.define('Mba.ux.MapLoader', {
    extend: 'Ext.Evented',
    alternateClassName: 'MapLoader',
    requires: [
        'Ext.util.DelayedTask',
        'Ext.device.Connection'
    ],
    singleton: true,
    _loaded: false,

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
        return this._loaded;
    },

    loadMap: function()
    {
        if (!Ext.device.Connection.isOnline()) {
            return false;
        }

        var url = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&' +
            'language=pt_BR&callback=Mba.ux.MapLoader.loaded';

        if (!Ext.Loader.scriptElements[url]) {
            var disableCaching = Ext.Loader.setConfig('disableCaching');
            Ext.Loader.setConfig('disableCaching', false);
            Ext.Loader.loadScriptFile(url, Ext.emptyFn, Ext.emptyFn);
            Ext.Loader.setConfig('disableCaching', disableCaching);
            return true;
        }

        return false;
    },

    updateScripts: function(scripts)
    {
        if (!Ext.isArray(scripts)) {
            return;
        }

        if (scripts.length === 0) {
            return;
        }

        if (!this._loaded) {
            throw 'Não é permitido atribuir scripts sem carregar o mapa';
        }

        Ext.each(scripts, function(value) {
            Ext.Loader.loadScriptFile(value, Ext.emptyFn, Ext.emptyFn);
        });
    },

    updateCallbackAfterLoad: function(callback)
    {
        if (!Ext.isFunction(callback)) {
            return;
        }

        if (!this._loaded) {
            throw 'Não é permitido atribuir scripts sem carregar o mapa';
        }

        callback();
    },

    loaded: function()
    {
        this._loaded = true;
    }
});
