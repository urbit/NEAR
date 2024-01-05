/+  dbug, default-agent, etch
|%
+$  acc  @uxH
+$  action 
  $%  [%add =acc]
      [%del =acc]
  ==
+$  versioned-state
  $%  state-0
  ==
+$  state-0 
  $:  %0  
      accs=(set acc)
  ==
+$  card  card:agent:gall
--
!:
=|  state-0
=*  state  -
%-  agent:dbug
^-  agent:gall
=<
  |_  =bowl:gall
  +*  this  .
      def   ~(. (default-agent this %|) bowl)
      hc    ~(. ^hc bowl)
::
  ++  on-init 
  ^-  (quip card _this)
  `this
::
  ++  on-save
    ^-  vase
    !>(state)
::
  ++  on-load
    |=  old-state=vase
    ^-  (quip card _this)
    =/  old  !<(versioned-state old-state)
    ?-  -.old
      %0  `this(state old)
    ==
::
  ++  on-poke  
    |=  [=mark =vase]
    ^-  (quip card _this)
    ?+    mark  (on-poke:def mark vase)
      %action
        ?>  =(src.bowl our.bowl)
        =/  act  !<(action vase)
        =^  cards  state 
          (handle-action:hc act)
        [cards this]
    ==
::
  ++  on-peek  
    |=  =path
    ^-  (unit (unit cage))
    ?+  path  (on-peek:def path)
    [%x %accs ~]
      :^  ~  ~  %json
      !>  ^-  json
      (accs:enjs:hc accs)
    ==
  ++  on-watch  on-watch:def 
::
  ++  on-leave  on-leave:def
  ++  on-agent  on-agent:def
  ++  on-arvo   on-arvo:def
  ++  on-fail   on-fail:def
--
|%  
::
++  hc
   |_  =bowl:gall
::
  ++  handle-action
  |=  act=action
  ^-  (quip card _state)
  ?-  -.act
    %add 
    :_  state(accs (~(put in accs) +.act))
    [%give %fact ~[/accs] %json !>((accs:enjs accs))]~
    ::
    %del 
    :_  state(accs (~(del in accs) +.act))
    [%give %fact ~[/accs] %json !>((accs:enjs accs))]~
  ==  
  ++  enjs
  |%
    ++  accs
      |=  accs=(set acc)
      ^-  json 
      %:  en-vase:etch 
      !>  ^-  (set acc)  accs
      ==
    --
--
--