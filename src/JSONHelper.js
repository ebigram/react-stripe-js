/*
{
  "name": "Your Business Name",
  "subscriptionLevel": "standard",
  "locations": [
    {
      "locationName": "My Business Location 1",
      "streetAddress": "123 High Street",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90013",
      "beacons": [
        {
          "beaconType": "TinwavePass",
          "quantity": 15
        },
        {
          "beaconType": "TinwaveTag",
          "quantity": 8
        }
      ],
      "floors": [
        {
          "floorName": "Showroom",
          "dimension_x": 25,
          "dimension_y": 60,
          "dimension_units": "feet",
          "open_floorplan": true,
          "floorplan_img_url": "https://s3-url-to-this-floorplan.com/image.jpg"
        },
        {
          "floorName": "Office",
          "dimension_x": 50,
          "dimension_y": 20,
          "dimension_units": "meters",
          "open_floorplan": false,
          "floorplan_img_url": "https://s3-url-to-this-floorplan.com/image2.jpg"
        }
      ]
    },
    {
      "locationName": "My Business Location 2",
      "streetAddress": "123 Low Street",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90013",
      "beacons": [
        {
          "beaconType": "TinwavePass",
          "quantity": 12
        }
      ],
      "floors": [
        {
          "floorName": "Call Center",
          "dimension_x": 18,
          "dimension_y": 33,
          "dimension_units": "feet",
          "open_floorplan": false,
          "floorplan_img_url": "https://s3-url-to-this-floorplan.com/image.jpg"
        },
        {
          "floorName": "Office",
          "dimension_x": 30,
          "dimension_y": 15,
          "dimension_units": "meters",
          "open_floorplan": true,
          "floorplan_img_url": "https://s3-url-to-this-floorplan.com/image2.jpg"
        }
      ]
    }
  ]
}
*/

function transformSchema(values) {
  return {
    name: values.businessName,
    subscriptionLevel: values.subscriptionType,
    locations: [
      {
        locationName: values.firstBusinessName,
        streetAddress: values.firstAddress,
        addressLocality: values.firstCity,
        addressRegion: values.state,
        postalCode: values.firstZipCode,
        beacons: [
          {
            beaconType: values.tinwavePassBeaconType,
            quantity: 15
          },
          {
            beaconType: "TinwaveTag",
            quantity: 8
          }
        ]
      }
    ]
  };
}

function sendDesignSubscriptionReq(body) {
  var request = new XMLHttpRequest();

  request.open("POST", "https://api.tinwave.com/billing/design-subscription");

  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader(
    "Authorization",
    "eyJraWQiOiJLZ1BNM2hPTFhScUQ3R2hET3ZBRkJWYWpueEg3TFwvXC9MMU5DQTNMb1RhOUk9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoicnVLWXltYjVyeXdVcGRTVnhsZUxWdyIsInN1YiI6IjVlODUyNGUyLWFjOTctNDE3ZS1hZWEwLWIyYTdlMzE5MjlkYiIsImF1ZCI6IjJwOWpiZ2NtYW4xZXJ2OTM3M2FzaTlyczIwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTg0OTg5OTY0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl83cDhkQVMzUjgiLCJjb2duaXRvOnVzZXJuYW1lIjoiNWU4NTI0ZTItYWM5Ny00MTdlLWFlYTAtYjJhN2UzMTkyOWRiIiwiZXhwIjoxNTg0OTkzNTY0LCJpYXQiOjE1ODQ5ODk5NjQsImVtYWlsIjoiYXZuZXJtYWliZXJnQGdtYWlsLmNvbSJ9.eUkepXjHaLH5y-v8rZc3lvHHcJ6J6MwEhaC88FnERXO4IU_SiPIXT3TffMs77dzLGCBSS13zXthjOpokvvZu9T33GzivhPKujqgyM_cO4PlDZWV9j2N2MTUTNOiACNd3pn3tEkKuMEHL5c_ZBvSHrWzR7j6_gTJuqylIV6Lwjdq6bBI53VEx0Ht3fkQ0HWaNyUzZWtsYNcApUQ94-wsjuauBbyuOML_7jQu7UFn74gGe4f6nUbq4s2qg3ALE-GVKIl3DnQiZlx0BjFcEaiUJsJS_aiIzcz7lTEWn9y9ut33dgBjxyLFKOe1lypLb57BA-P1ef5HxrX3pmWEHL3j2yQ"
  );

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      console.log("Status:", this.status);
      console.log("Headers:", this.getAllResponseHeaders());
      console.log("Body:", this.responseText);
    }
  };

  var body = {
    name: "Your Business Name",
    subscriptionLevel: "standard",
    locations: [
      {
        locationName: "My Business Location 1",
        streetAddress: "123 High Street",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90013",
        beacons: [
          {
            beaconType: "TinwavePass",
            quantity: 15
          },
          {
            beaconType: "TinwaveTag",
            quantity: 8
          }
        ],
        floors: [
          {
            floorName: "Showroom",
            dimension_x: 25,
            dimension_y: 60,
            dimension_units: "feet",
            open_floorplan: true,
            floorplan_img_url: "https://s3-url-to-this-floorplan.com/image.jpg"
          },
          {
            floorName: "Office",
            dimension_x: 50,
            dimension_y: 20,
            dimension_units: "meters",
            open_floorplan: false,
            floorplan_img_url: "https://s3-url-to-this-floorplan.com/image2.jpg"
          }
        ]
      },
      {
        locationName: "My Business Location 2",
        streetAddress: "123 Low Street",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90013",
        beacons: [
          {
            beaconType: "TinwavePass",
            quantity: 12
          }
        ],
        floors: [
          {
            floorName: "Call Center",
            dimension_x: 18,
            dimension_y: 33,
            dimension_units: "feet",
            open_floorplan: false,
            floorplan_img_url: "https://s3-url-to-this-floorplan.com/image.jpg"
          },
          {
            floorName: "Office",
            dimension_x: 30,
            dimension_y: 15,
            dimension_units: "meters",
            open_floorplan: true,
            floorplan_img_url: "https://s3-url-to-this-floorplan.com/image2.jpg"
          }
        ]
      }
    ]
  };

  request.send(JSON.stringify(body));
}
export default transformSchema;
