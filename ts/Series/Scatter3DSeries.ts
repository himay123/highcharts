/* *
 *
 *  (c) 2010-2020 Torstein Honsi
 *
 *  Scatter 3D series.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

import type SVGAttributes from '../Core/Renderer/SVG/SVGAttributes';
import BaseSeries from '../Core/Series/Series.js';
const { seriesTypes } = BaseSeries;
import H from '../Core/Globals.js';
import Math3D from '../Extensions/Math3D.js';
const { pointCameraDistance } = Math3D;
import Point from '../Core/Series/Point.js';

/**
 * Internal types
 * @private
 */
declare global {
    namespace Highcharts {
        interface Scatter3dPointOptions extends ScatterPointOptions {
            z?: number;
        }
        interface Scatter3dSeriesOptions extends ScatterSeriesOptions {
        }
        class Scatter3dPoint extends ScatterPoint {
            public options: Scatter3dPointOptions;
            public series: Scatter3dSeries;
        }
        class Scatter3dSeries extends ScatterSeries {
            public data: Array<Scatter3dPoint>;
            public options: Scatter3dSeriesOptions;
            public pointClass: typeof Scatter3dPoint;
            public points: Array<Scatter3dPoint>;
        }
    }
}

/**
 * @private
 */
declare module '../Core/Series/Types' {
    interface SeriesTypeRegistry {
        scatter3d: typeof Highcharts.Scatter3dSeries;
    }
}

import './ScatterSeries.js';

/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.scatter3d
 *
 * @augments Highcharts.Series
 */
BaseSeries.seriesType<typeof Highcharts.Scatter3dSeries>(
    'scatter3d',
    'scatter',
    /**
     * A 3D scatter plot uses x, y and z coordinates to display values for three
     * variables for a set of data.
     *
     * @sample {highcharts} highcharts/3d/scatter/
     *         Simple 3D scatter
     * @sample {highcharts} highcharts/demo/3d-scatter-draggable
     *         Draggable 3d scatter
     *
     * @extends      plotOptions.scatter
     * @excluding    dragDrop, cluster, boostThreshold, boostBlending
     * @product      highcharts
     * @requires     highcharts-3d
     * @optionparent plotOptions.scatter3d
     */
    {
        tooltip: {
            pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>'
        }

    // Series class
    }, {
        pointAttribs: function (
            this: Highcharts.Scatter3dSeries,
            point: Highcharts.Scatter3dPoint
        ): SVGAttributes {
            var attribs = seriesTypes.scatter.prototype.pointAttribs
                .apply(this, arguments as any);

            if (this.chart.is3d() && point) {
                attribs.zIndex =
                    pointCameraDistance(point as any, this.chart);
            }

            return attribs;
        },
        axisTypes: ['xAxis', 'yAxis', 'zAxis'],
        pointArrayMap: ['x', 'y', 'z'],
        parallelArrays: ['x', 'y', 'z'],

        // Require direct touch rather than using the k-d-tree, because the
        // k-d-tree currently doesn't take the xyz coordinate system into
        // account (#4552)
        directTouch: true

    // Point class
    }, {
        applyOptions: function (
            this: Highcharts.Scatter3dPoint
        ): Highcharts.Scatter3dPoint {
            Point.prototype.applyOptions.apply(this, arguments as any);
            if (typeof this.z === 'undefined') {
                this.z = 0;
            }

            return this;
        }

    }
);


/**
 * A `scatter3d` series. If the [type](#series.scatter3d.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * scatter3d](#plotOptions.scatter3d).
 *
 * @extends   series,plotOptions.scatter3d
 * @excluding boostThreshold, boostBlending
 * @product   highcharts
 * @requires  highcharts-3d
 * @apioption series.scatter3d
 */

/**
 * An array of data points for the series. For the `scatter3d` series
 * type, points can be given in the following ways:
 *
 * 1.  An array of arrays with 3 values. In this case, the values correspond
 * to `x,y,z`. If the first value is a string, it is applied as the name
 * of the point, and the `x` value is inferred.
 *
 *  ```js
 *     data: [
 *         [0, 0, 1],
 *         [1, 8, 7],
 *         [2, 9, 2]
 *     ]
 *  ```
 *
 * 3.  An array of objects with named values. The following snippet shows only a
 * few settings, see the complete options set below. If the total number of data
 * points exceeds the series'
 * [turboThreshold](#series.scatter3d.turboThreshold), this option is not
 * available.
 *
 *  ```js
 *     data: [{
 *         x: 1,
 *         y: 2,
 *         z: 24,
 *         name: "Point2",
 *         color: "#00FF00"
 *     }, {
 *         x: 1,
 *         y: 4,
 *         z: 12,
 *         name: "Point1",
 *         color: "#FF00FF"
 *     }]
 *  ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<number>|*>}
 * @extends   series.scatter.data
 * @product   highcharts
 * @apioption series.scatter3d.data
 */

/**
 * The z value for each data point.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.scatter3d.data.z
 */

''; // adds doclets above to transpiled file
