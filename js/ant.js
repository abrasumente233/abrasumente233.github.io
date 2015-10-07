'use strict';

(function () {
    'use strict';

    var height = 50,
        width = 70,
        center = { 'x': Math.floor(width / 2), 'y': Math.floor(height / 2) },
        directions = ['top', 'right', 'bottom', 'left'];

    var delay = 500;

    var moved = new signals.Signal();

    var SquareLattice = React.createClass({ displayName: "SquareLattice",
        getInitialState: function getInitialState() {

            // initial work of this.state.color
            var color = [];
            for (var x = 0; x < width; x++) {
                color[x] = [];
                for (var y = 0; y < width; y++) {
                    color[x][y] = false; // False means white, true means black
                }
            }

            return {
                antX: center.x,
                antY: center.y,
                antDirection: 3, // Default direction is left,
                color: color
            };
        },
        componentDidMount: function componentDidMount() {
            var move = (function () {

                var ant = document.getElementsByClassName('ant')[0],
                    className = ant.getAttribute('class'),
                    right = className.indexOf('white') > -1;

                // 不用理解这里的意思，知道白右转黑左转就行了！！！
                var direction = right ? (this.state.antDirection + 1) % 4 : this.state.antDirection - 1 === -1 ? 3 : this.state.antDirection - 1,
                    x = direction % 2 !== 0 ? direction === 1 ? this.state.antX + 1 : this.state.antX - 1 : this.state.antX,
                    y = direction % 2 === 0 ? direction === 0 ? this.state.antY - 1 : this.state.antY + 1 : this.state.antY;

                console.log(direction, x, y);

                this.state.color[this.state.antX][this.state.antY] = !this.state.color[this.state.antX][this.state.antY];

                this.setState({
                    antX: x,
                    antY: y,
                    antDirection: direction
                });

                moved.dispatch(direction, x, y, x < 0 || y < 0);

                setTimeout(move, delay);
            }).bind(this);
            setTimeout(move, delay);
        },
        render: function render() {
            var rows = [];
            for (var y = 0; y < height; y++) {
                var cells = [];
                for (var x = 0; x < width; x++) {
                    cells[x] = React.createElement(Cell, { ant: x === this.state.antX && y === this.state.antY, color: this.state.color[x][y] ? 'black' : 'white' });
                }
                rows[y] = React.createElement("div", { className: "row" }, cells);
            }

            return React.createElement("div", null, rows);
        }
    });

    var Cell = React.createClass({ displayName: "Cell",
        propTypes: {
            ant: React.PropTypes.bool.isRequired,
            color: React.PropTypes.string.isRequired
        },
        getInitialState: function getInitialState() {
            var ant = this.props.x == center.x && this.props.y == center.y,
                status = 'white';
            return { status: status, ant: ant };
        },
        render: function render() {
            var cx = React.addons.classSet;
            var classes = cx('cell', this.props.color, this.props.ant ? 'ant' : '');
            if (this.props.ant) {
                console.log('ok');
            }
            return React.createElement("div", { className: classes });
        }
    });

    var Langton = React.createClass({ displayName: "Langton",
        render: function render() {
            return React.createElement("div", null, React.createElement(SquareLattice, null), React.createElement(Scoreboard, null));
        }
    });

    var Scoreboard = React.createClass({ displayName: "Scoreboard",
        getInitialState: function getInitialState() {
            return {
                delay: delay,
                movement: 0,
                direction: -1,
                x: -1,
                y: -1,
                out: false
            };
        },
        onMove: function onMove(direction, x, y, out) {
            this.setState({
                movement: this.state.movement + 1,
                direction: direction,
                x: x,
                y: y,
                out: out
            });
        },
        componentDidMount: function componentDidMount() {
            moved.add(this.onMove);
        },
        handleChange: function handleChange(event) {
            delay = +event.target.value;
            this.setState({ delay: +event.target.value });
        },
        render: function render() {
            return React.createElement("div", { id: "scoreboard" }, React.createElement("h1", null, "Stats"), React.createElement("p", null, "Movement: ", this.state.movement, " time(s)"), React.createElement("p", null, "Direction: ", directions[this.state.direction]), React.createElement("p", null, "Position: ", this.state.x + ', ' + this.state.y), React.createElement("p", null, "Out of border: ", this.state.out + ''), React.createElement("label", { htmlFor: "delay" }, "Delay "), React.createElement("input", { type: "number", step: "50", min: "1", name: "delay", onChange: this.handleChange, value: this.state.delay }));
        }
    });

    React.render(React.createElement(Langton, null), document.getElementById('content'));
})();