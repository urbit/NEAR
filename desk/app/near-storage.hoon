/+  dbug, default-agent, verb
|%
+$  key  cord
+$  val  cord
::
+$  near-storage-action
  $%  [%remove-item =key]
      [%set-item =key =val]
  ==
::
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      store=(map key val)
  ==
::
+$  card  card:agent:gall
--
%+  verb  %.y
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this     .
    default  ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  `this
::
++  on-save
  !>(state)
::
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  :-  ~
  %=  this
    state  !<(state-0 old)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(mark %noun)
  =/  act
    !<(near-storage-action vase)
  ?-  -.act
  ::
      %set-item
    :-  ~
    %=  this
      store  (~(put by store) [key.act val.act])
    ==
  ::
      %remove-item
    :-  ~
    %=  this
      store  (~(del by store) key.act)
    ==
  ==
::
++  on-peek
  |=  =(pole knot)
  ^-  (unit (unit cage))
  ?>  =(src.bowl our.bowl)  
  ?+  pole
    (on-peek:default pole)
  ::
      [%x =key ~]
    ::
    ::  .^(json %gx /=near-storage=/chess-ratings/json)
    ``[%json !>([%s (~(gut by store) key.pole '')])]
  ==
::
++  on-watch  on-watch:default
++  on-arvo   on-arvo:default
++  on-leave  on-leave:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
