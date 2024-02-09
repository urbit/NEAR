|%
+$  provider  @p
+$  id        @da
+$  content   @t  ::will probably be JSON
+$  request   [=id =content]
+$  action
  $%  [%change-provider =provider]
      [%send-request =content]
  ==
+$  ask
  $%  [%request =request]
  ==
+$  response  [%response ~]
--