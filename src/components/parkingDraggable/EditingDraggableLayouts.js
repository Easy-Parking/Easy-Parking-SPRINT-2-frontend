import React, { Component } from 'react';

import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "../../styles/parkingDraggable/styles.css";

import Button from '@material-ui/core/Button';

import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';


class EditingDraggableLayouts extends Component {

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
        this.saveParking = this.saveParking.bind(this);

    }

    saveParking(){

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
                    <Button variant="outlined" color="primary" onClick={this.saveParking}>
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