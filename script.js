require(["esri/views/MapView", "esri/WebMap"], (MapView, WebMap) => {
       
        const webmap = new WebMap({
          portalItem: {
            id: "da44d6cb560c4322a7842871e71c362b"
          }
        });

        const view = new MapView({
          map: webmap,
          container: "viewDiv"
        });
      });
