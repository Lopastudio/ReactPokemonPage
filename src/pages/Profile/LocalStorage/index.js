import { useState, useEffect } from 'react';

function MyComponent() {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setMyData(JSON.parse(storedData));
    }
  }, []);

  const handleSave = () => {
    const data = { foo: 'bar' };
    localStorage.setItem('myData', JSON.stringify(data));
    setMyData(data);
  };

  const handleClear = () => {
    localStorage.removeItem('myData');
    setMyData(null);
  };

  return (
    <div>
      <button onClick={handleSave}>Save data</button>
      <button onClick={handleClear}>Clear data</button>
      {myData && (
        <div>
          My data: {myData.foo}
        </div>
      )}
    </div>
  );
}
export default MyComponent;