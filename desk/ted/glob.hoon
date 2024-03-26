/-  spider, *near-gateways
/+  strandio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
::=+  !<([~ url=@t] arg)
=+  !<([~ url=@t about=@t] arg)
;<  =glob  bind:m
  %+  (retry:strandio ,glob)  `5
  =/  n  (strand ,(unit glob))
  ;<  =cord  bind:n  (fetch-cord:strandio (trip url))
  %-  pure:n
  %-  mole
  |.
  ;;(=glob (cue cord))
(pure:m !>([glob about]))
