/-  *near-handler
/+  dbug, default-agent, *near-handler
::
|%
::
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0 
  $:  %0  
      accs=(set acc)
  ==
::
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
      hc    ~(. +> bowl)
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
    ?+  mark  (on-poke:def mark vase)
      %action
    ?>  =(src.bowl our.bowl)
    =/  act  !<(action vase)
    =^  cards 
      state  
    (handle-action act)
    [cards this]
    ==
::
  ++  on-peek  
    |=  =path
    ^-  (unit (unit cage))
    ?+  path  (on-peek:def path)
      [%x %accs ~]
    :^    ~  
        ~  
      %near-handler-update
    !>  ^-  update
    [%accs accs]
    ==
  ++  on-watch  
    |=  =path
    ^-  (quip card _this)
    ?>  =(src.bowl our.bowl)
    ?+  path  (on-watch:def path)
      [%accs ~]
    :_  this
    give-accs
    ==
::
  ++  on-leave  on-leave:def
  ++  on-agent  on-agent:def
  ++  on-arvo   on-arvo:def
  ++  on-fail   on-fail:def
--
|_  =bowl:gall
::
  ++  handle-action
  |=  act=action
  ^-  (quip card _state)
  ?-  -.act
    %add 
  =.  accs  (~(put in accs) +.act)
  :_  state
  give-accs
    ::
    %del 
  =.  accs  (~(del in accs) +.act)
  :_  state
  give-accs
  ==  
  ::
  ++  give-accs
  ^-  (list card)
  [%give %fact ~[/accs] %near-handler-update !>([%accs accs])]~
--
