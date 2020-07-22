import React, { Component } from 'react';

import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "../../styles/parkingDraggable/styles.css";

import Button from '@material-ui/core/Button';

import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';


class DraggableLayouts extends Component {

    static defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 20, xxs: 2 },
        rowHeight: 100,
        rowWidth: 100,
        verticalCompact: false,
        compactType: 'horizontal'
      };
    
      constructor(props) {
        super(props);
    
        this.state = {
          items: [],
          newCounter: 0,
          user: this.props.user,
          // objeto que guardara el parqueadero del usuario
          parking: {
                    name: this.props.name,
                    piso: this.props.piso,
                    slots: []
          },
          parkings: []
        };
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.registerParking = this.registerParking.bind(this);
        this.changeParkingSlots = this.changeParkingSlots.bind(this);
        this.changeParkings = this.changeParkings.bind(this);
        this.setCookiesEd = this.setCookiesEd.bind(this);
    }


    async changeParkingSlots(park){
      this.setState({parking: {
        name: this.props.name,
        piso: this.props.piso,
        slots: park
      }})
    }
    async changeParkings(){
      var parkingsAll = this.props.user.parkings;
      var parking = this.state.parking;
      if(parkingsAll.length !== 0){
        for (var item2 of parkingsAll) {
          this.setState({ 
            parkings: this.state.parkings.concat(item2) 
          })
        }
        this.setState({ 
          parkings: this.state.parkings.concat(parking) 
        })
      }else{
        this.setState({ 
          parkings: this.state.parkings.concat(parking) 
        })
      }
    }

    async registerParking() {
      var slotsUser = [];
      // cambiar variable static a static1
      var slotsSystem = this.state.layout.map( item => { 
        // lo guardas temporalmente
        var temporal = item.static;
        // eliminas el valor que ya no quieres
        delete item.static;
        // creas el valor nuevo.
        item.static1 = temporal;
        return item; 
      });

      if(slotsSystem !== null){
        if (slotsSystem.length !== 0) {
          for (var item of slotsSystem) {
            slotsUser.push(item);
          }
        }else{
          slotsUser = slotsSystem;
        }
      }else {
        slotsUser = slotsSystem;
      }

      if (this.state.parking.name === "" ||
        this.state.parking.piso === "") {
        Swal.fire("Faltan campos!", "Por favor, llene el nombre o piso faltante y regrese", "error");
      } else {

        await this.changeParkingSlots(slotsUser);
        await this.changeParkings();

        let res = await axios.post('http://localhost:8080/users/save/', {
          name: this.state.user.name,
          rol: this.state.user.rol,
          email: this.state.user.email,
          password: this.state.user.password,
          parkings: this.state.parkings
        })
          .then(function (response) {

            if (response.status === 200) {
              Swal.fire(
                'parking creado satisfactoriamente!',
                '',
                'success'
              )
            } else {
              Swal.fire("error", "error en el servidor, intente de nuevo", "error");
            }

          })
          .catch(function (error) {
            console.log(error);
          })
          this.setCookiesEd();
          ;
      }
    }

    async setCookiesEd(){
      Cookies.remove('user', { path: '' });
      Cookies.set('user', { 
        name: this.state.user.name,
        rol: this.state.user.rol,
        email: this.state.user.email,
        password: this.state.user.password,
        parkings: this.state.parkings
      });
    }

    createElement(el) {
        const removeStyle = {
          position: "absolute",
          right: "2px",
          top: 0,
          cursor: "pointer"
        };
        const i = el.add ? "+" : el.i;
        return (
          <div key={i} data-grid={el}>
            {el.add ? (
              <span
                className="add text"
                onClick={this.onAddItem}
                title="You can add an item by clicking here, too."
              >
                Add +
              </span>
            ) : (
              <span className="text">{i}</span>
            )}
            <span
              className="remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, i)}
            >
              x
            </span>
          </div>
        );
      }
    
      onAddItem() {
        /*eslint no-console: 0*/
        this.setState({
          // Add a new item. It must have a unique key!
          items: this.state.items.concat({
            i: "n: " + this.state.newCounter,
            x: (this.state.items.length * 2) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: 1,
            h: 1,
            minW: 0.2,
            minH: 0.2,
            
          }),
          // Increment the counter to ensure key is always unique.
          newCounter: this.state.newCounter + 1
        });

      }
    
      // We're using the cols coming back from this to calculate where to add new items.
      onBreakpointChange(breakpoint, cols) {
        this.setState({
          breakpoint: breakpoint,
          cols: cols
        });
      }
    
      onLayoutChange(layout) {
        //this.props.onLayoutChange(layout);
        this.setState({ layout: layout });
      }
    
      onRemoveItem(i) {
        this.setState({ items: _.reject(this.state.items, { i: i }) });
        this.setState({ newCounter: this.state.newCounter-1});
      }


    render() {
        
        return (
            <div> 
                <div>
                    <Button variant="outlined" color="primary" onClick={this.onAddItem}>
                        Add Item
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.registerParking}>
                        Guardar Parking
                    </Button>
                    <ResponsiveReactGridLayout
                        onLayoutChange={this.onLayoutChange}
                        onBreakpointChange={this.onBreakpointChange}
                        {...this.props}
                    >
                        {_.map(this.state.items, el => this.createElement(el))}
                    </ResponsiveReactGridLayout>
                </div>
            </div>

        )
    }
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default DraggableLayouts;