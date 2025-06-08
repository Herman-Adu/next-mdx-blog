interface GreetingsProps {
  name: string;
}

const Greetings = ({ name }: GreetingsProps) => {
  return (
    <div>
      <span>Welcome Back: {name}</span>
    </div>
  );
};

export default Greetings;
