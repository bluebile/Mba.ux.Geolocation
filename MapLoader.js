Ext.define('Mba.ux.MapLoader', {
    extend: 'Ext.Evented',
    alternateClassName: 'MapLoader',
    requires: [
        'Ext.util.DelayedTask',
        'Ext.device.Connection'
    ],
    singleton: true,
    _loaded: false,
    scripts: [],
    callbackAfterLoad: Ext.emptyFn,

    initialize: function()
    {
        this.callParent();
        document.addEventListener('resume', Ext.Function.bind(this.loadMap, this), false);
    },

    isLoaded: function()
    {
        return this._loaded;
    },

    setCallbackAfterLoad: function(callback)
    {
        if (!Ext.isFunction(callback)) {
            throw 'Necessário function';
        }
        this.callbackAfterLoad = callback;

        if (this.isLoaded()) {
            this.callbackAfterLoad();
        }
    },

    setScripts: function(scripts)
    {
        if (!Ext.isArray(scripts)) {
            throw 'Necessário array';
        }

        this.scripts = scripts;

        if (this.isLoaded()) {
            this.includeScripts(this.scripts);
        }
    },

    addScript: function(script)
    {
        this.scripts.push(script);

        if (this.isLoaded()) {
            this.includeScripts([script]);
        }
    },

    loadMap: function()
    {
        if (!Ext.device.Connection.isOnline()) {
            return false;
        }

        if (this.isLoaded()) {
            return;
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

    loaded: function()
    {
        this._loaded = true;

        this.includeScripts(this.scripts);

        this.callbackAfterLoad();
    },

    includeScripts: function(scripts)
    {
        Ext.each(scripts, function(value) {
            Ext.Loader.loadScriptFile(value, Ext.emptyFn, Ext.emptyFn);
        });
    }
});
