require([
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/views/MapView",
      "dojo/domReady!"
    ], function(
      Map,
      FeatureLayer,
      MapView
    ) {

      // Create the map
      var map = new Map({
        basemap: "oceans"
      });

      // Create the MapView
      var view = new MapView({
        container: "viewDiv",
        map: map,
        center:[-90, 38],
        zoom: 4
      });

      /*************************************************************
       * The PopupTemplate content is the text that appears inside the
       * popup. {fieldName} can be used to reference the value of an
       * attribute of the selected feature. HTML elements can be used
       * to provide structure and styles within the content. The
       * fieldInfos property is an array of objects (each object representing
       * a field) that is use to format number fields and customize field
       * aliases in the popup and legend.
       **************************************************************/

      var template = { // autocasts as new PopupTemplate()
        title: "Kelp Info",
        content: [{

          type: "fields",
          fieldInfos: [{
            fieldName: "ECOREGION",
            label: "Ecoregion: ",
            visible: true
          }, {
            fieldName: "PROVINCE",
            label: "Province: ",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          }, {
            fieldName: "REALM",
            label: "Area: ",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          }, {
            fieldName: "popup_text",
            label: "Details",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          }]
        }]
      };

    var symbol = {
      type: "picture-marker", //kelp icon
      url: "data:image/png;base64,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",
      width: "20px",
      height: "20px"
    };
      var renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: symbol
    };
      // Reference the popupTemplate instance in the
      // popupTemplate property of FeatureLayer
  
      var featureLayer1 = new FeatureLayer({
        url: "https://cumulus.tnc.org/arcgis/rest/services/Atlas/MarineMaps/MapServer/6",
        outFields: ["*"],
        renderer: renderer,
        popupTemplate: template
      });
      map.add(featureLayer1);
  
        var featureLayer2 = new FeatureLayer({
        url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Coral_Reef_Stations/FeatureServer",
             renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: 4
      }
             }        
      });
      map.add(featureLayer2);
      
    });
