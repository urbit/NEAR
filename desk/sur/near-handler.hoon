|%
+$  acc  @uxH
+$  metadata  [name=@t url=@t]  
+$  identifier  [=ship id=@ud]
+$  action 
  $%  [%add =acc]
      [%del =acc]
      [%poke [=dude:gall =mark json=(unit json)]]
  ==
+$  update
  $%  [%accs accs=(set acc)]
  ==
+$  gateway-action 
  $%  [%publish =metadata]
      [%install =identifier =metadata]
  ==
--