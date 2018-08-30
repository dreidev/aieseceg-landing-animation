window.Controller =
{
    // properties
        tl          :null,
        paused      :false,
        offsetX     :0,
    
    // elements
        $element    :null,
        $buttons    :null,
        $timeline   :null,
        $playhead   :null,
        $labels     :null,
        
    // instantiation
        init: function(tl, parent)
        {
            // properties
                this.tl         = tl;
                
            // wire update if not already assigned
                if ( ! this.tl.vars.onUpdate )
                {
                    this.tl.eventCallback('onUpdate', this.update, null, this);
                } 

            $(parent || document.body).append($(['<div id="gs-ctrl">',
                '<div id="gs-buttons">',
                    '<div class="play">',
                        '<button id="resume">Play</button>',
                        '<button id="stop">Stop</button>',
                        '<button id="restart">Restart</button>',
                    '</div>',
                    '<div class="seek">',
                        '<button id="prev">&lt; Prev</button>',
                        '<button id="next">Next &gt;</button>',
                    '</div>',
                    '<div class="">',
                    '</div>',
                '</div>',
                '<div id="gs-timeline">',
                    '<span id="gs-playhead"></span>',
                '</div>',
                '<div id="gs-labels">',
                '</div>',
            '</div>'].join('')));          
                
            // elements
                this.$element   = $('#gs-ctrl');
                this.$buttons   = $('#gs-buttons');
                this.$timeline  = $('#gs-timeline');
                this.$playhead  = $('#gs-playhead');
                this.$labels    = $('#gs-labels');
                
            // handlers
                this.$buttons
                    .find('.play button')
                    .on('click', $.proxy(this.onPlayButtonsClick, this));
                    
                this.$buttons
                    .find('.seek button')
                    .on('click', $.proxy(this.onSeekButtonsClick, this));
                    
                this.$timeline
                    .on('mousedown', $.proxy(this.onTimelineMouseDown, this));
                    
                this.$labels
                    .on('click', 'span', $.proxy(this.onLabelClick, this));
                $('window').on('keyup', function(e){
                   if(e.keyCode === 32 && e.target === document.body){
                       this.togglePlay();
                        e.preventDefault();
                        return false;
                   }
                }, this);
                 window.onkeydown = function(e) {
                    if(e.keyCode == 32 && e.target == document.body) {
                        e.preventDefault();
                        return false;
                    }
                };
            // append to
                
                
            // refresh
                this.refresh();
        },
        
    // public methods
        refresh:function()
        {
            // seeking
                if (this.tl.getLabelsArray)
                {
                    // variables
                        var name, time, value, html;
                        var labels = this.tl.getLabelsArray();
                        
                    // update labels
                        this.$labels.empty();
                        for (var i = 0; i < labels.length; i++)
                        {
                            name    = labels[i].name;
                            time    = labels[i].time;
                            value   = Math.floor((time / this.tl.duration()) * 100);
                            html    = '<span style="left:' +value+ '%">' +name+ '</span>';
                            this.$labels.append(html);
                        }
                }
                
            // ui
                this.$buttons.find('.seek')[!!this.tl.getLabelsArray ? 'show' : 'hide']();
            
            // update   
                this.update();
        },
        
        appendTo:function(parent)
        {
            $(parent).append(this.$element);
        },
        
        seek:function(time, pause)
        {
            this.tl.seek(time);
            if (pause)
            {
                this.tl.pause();
            }
            this.update();
        },
        
        update:function()
        {
            if (this.tl)
            {
                var p = this.tl.progress();
                var t = this.tl.time();
                var d = this.tl.duration();
                var c = d * p;
                this.$playhead
                    .width((p * 100) + '%')
                    .html('Time:&nbsp;' + t.toFixed(3));
            }
        },
        
    // internal handlers
        onPlayButtonsClick:function(event)
        {
            switch(event.target.id) {
            case 'resume':
                this.togglePlay();
                break;
            case 'stop':
                this.tl.pause().progress(0);
                $('#resume').text('Play');
                break;
            default:
                this.tl[event.target.id]();
            }
        },
        togglePlay: function  () {
            if (this.tl.paused()) {
                $('#resume').text('Pause');
                this.tl.resume();
            } else {
                this.tl.pause();
                $('#resume').text('Play');
            }
        },
        
        onSeekButtonsClick:function(event)
        {
            var t = event.target.id == 'prev'
                ? this.tl.getLabelBefore() || 0
                : this.tl.getLabelAfter() || this.tl.duration();
            this.seek(t);
        },
        
        onTimelineMouseDown:function(event)
        {
            // cancel default event
                event.originalEvent.preventDefault();
                
            // update properties
                this.offsetX = event.pageX - event.offsetX;
                this.paused = this.tl.paused();
                
            // assign event handlers
                $('body')
                    .on('mousemove', $.proxy(this.onTimelineMouseMove, this))
                    .on('mouseup', $.proxy(this.onTimelineMouseUp, this));
                    
            // update
                this.onTimelineMouseMove(event);
        },
        
        onTimelineMouseMove:function(event)
        {
            var w = this.$timeline.width();
            var x = event.pageX - this.offsetX;
            var p = x / w;
            var t = this.tl.totalDuration() * p;
            this.seek(t, true);
        },
        
        onTimelineMouseUp:function(event)
        {
            $('body').off('mousemove mouseup');
            if ( ! this.paused )
            {
                this.tl.resume();
            }
        },
        
        onLabelClick:function(event)
        {
            this.seek($(event.target).text());
        }
}
