const GlowLight = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  background-color: ${(props) => (props.isConnected ? "green" : "red")};
  box-shadow: 0 0 8px ${(props) => (props.isConnected ? "green" : "red")};
`;

const Label = styled.span`
  font-size: 16px;
`;

const StatusIndicator = ({ isConnected, label }) => {
  return (
    <div className="d-flex align-items-center">
      <GlowLight isConnected={isConnected} />
      <Label>{label}</Label>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5; /* Light grey background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

return (
  <Container>
    <Section>
      <div>
        <SectionTitle>Configuration</SectionTitle>
        <StatusIndicator isConnected={Urbit} label={"VM Configured"} />
      </div>
    </Section>
  </Container>
);
