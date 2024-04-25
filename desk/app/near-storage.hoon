/+  dbug, default-agent, verb
|%
+$  app   cord
+$  key   cord
+$  card  card:agent:gall
::
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      store=(map app (map key json))
  ==
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
  =/  act  !<([%set-state json] vase)
  :-  ~
  %=  this
    store  (~(put by (~(get by (~(get by store) app.act)) key.act)) val.act)
  ==
::
++  on-peek
  |=  =(pole knot)
  ^-  (unit (unit cage))
  ?>  =(src.bowl our.bowl)
  ?+  pole
    (on-peek:default pole)
  ::
      [%x =app =key ~]
    ::
    ::  .^(json %gx /=near-storage=/chess/ratings/json)
    [~ ~ [%json !>((~(get by (~(get by store) app.pole)) key.pole))]]
  ==
::
++  on-watch  on-watch:default
++  on-arvo   on-arvo:default
++  on-leave  on-leave:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
