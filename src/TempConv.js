import {useState} from 'react';

export function TempConv(){
  const [cel, setCel] =useState();
  const [fah, setFah] = useState();
  return (
    <div>
    <label >Cel
      <input type="text" value={cel}
    onChange= {
      (e)=>{
        setCel(e.target.value);
        if (!isNaN(e.target.value)) {
          setFah(Math.round(e.target.value*9/5+32));
        }
      }
    }


    />
    </label>
    <label >Fah
      <input type="text" value={fah}
    onChange = {
      (e)=>{
        setFah(e.target.value);
        if (!isNaN(e.target.value)) {
          setCel(Math.round((e.target.value-32)*5/9));
        }
      }}
    />
    </label>
    </div>
  )
}
