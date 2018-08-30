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
                        '<button data-action="resume">Play</button>',
                        '<button data-action="stop">Stop</button>',
                        '<button data-action="restart">Restart</button>',
                        '<button data-action="scale-2-up">x2</button>',
                        '<button data-action="scale-2-down">/2</button>',
                        '<button data-action="-frame">-</button>',
                        '<button data-action="+frame">+</button>',
                    '</div>',
                    '<div class="seek">',
                        '<button id="prev">&lt; Prev Label</button>',
                        '<button id="next">Next Label &gt;</button>',
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

                window.addEventListener('keyup', $.proxy(function(e){
                    e.preventDefault();
                   if(e.keyCode === 32){
                       this.togglePlay();
                   }
                }, this));
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
            this.tl.seek(time, false);
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
            switch(event.target.dataset.action) {
            case 'resume':
                this.togglePlay();
                break;
            case 'scale-2-up':
                this.tl.timeScale(this.tl.timeScale()*2);
                break;
            case 'scale-2-down':
                this.tl.timeScale(this.tl.timeScale()/2);
                break;
            case '-frame':
                this.seek(this.tl.time()-0.016);
                break;
            case '+frame':
                this.seek(this.tl.time()+0.016);
                break;
            case 'stop':
                this.seek(0, true);
                break;
            default:
                this.tl[event.target.dataset.action]();
            }
        },
        togglePlay: function  () {
            if (this.tl.paused()) {
                this.tl.resume();
                $('#resume').text('Play');
            } else {
                this.tl.pause();
                $('#resume').text('Pause');
            }
            this.update();
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
