|%
+$  acc  @uxH
:: +$  glob  (map path mime)
+$  metadata  [name=@t url=@t]  
+$  identifier  [=ship id=@uvH]
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