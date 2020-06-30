import React, { Component } from 'react';

import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "../../styles/parkingDraggable/styles.css";

import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


class DraggableLayouts extends Component {

    static defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 100,
        verticalCompact: false
        

      };
    
      constructor(props) {
        super(props);
    
        this.state = {
          items: [],
          newCounter: 0
        };
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        
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
        console.log("adding", "n" + this.state.newCounter);
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
        console.log("removing", i);
        this.setState({ items: _.reject(this.state.items, { i: i }) });
        this.setState({ newCounter: this.state.newCounter-1});
      }


    render() {
        
        return (
            <div> 
                <div>
                    <button onClick={this.onAddItem}>Add Item</button>
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