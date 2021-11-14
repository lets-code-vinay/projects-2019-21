import React, {Component} from 'react';
import items from './data';
import Client from './Contentful';



const RoomContext = React.createContext();

export default class RoomProvider extends Component{
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
    
        type:'',
        capacity:1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false
    };
    // getData{}  is function used when data is loading
    getData = async () => {
        try{
            let response = await Client.getEntries({
                content_type: "beachQueen",
                //order:"sys.createdAt"
                order:"-fields.price"
            });
            //cut and paster from componentDidmoint
            let rooms = this.formatData(response.items)  //formatData() used to normal object
            //        console.log(rooms);
                    let featuredRooms = rooms.filter(room => room.featured === true);
            //filtering data
                    let maxPrice= Math.max(...rooms.map(item => item.price))
                    let maxSize = Math.max(...rooms.map(item => item.size))
                    this.setState({
                        rooms, 
                        featuredRooms,
                        sortedRooms:rooms,
                        loading:false,
                        price:maxPrice,
                        maxPrice,
                        maxSize
            
                    })
            
            .then(response => console.log(response.items));
            
        } catch(error){
            console.log(error)
        }
    }
    //lifeCycle method --> componentDidMount()

    componentDidMount(){
        this.getData()
    }

    formatData(item){
        let tempItems = items.map(item =>{

            let id = item.sys.id;
            let images = item.fields.images.map(image=> image.fields.file.url)
            let room = {...item.fields,images, id}  //accessing all data images and id is getting from variable

            return room;   //returning the room with all details
        })
        return tempItems;  //return the mapped objects
    }

getRoom = slug =>{
    let tempRooms = [...this.state.rooms];
    const  room = tempRooms.find(room => room.slug === slug);
    return room;
}

handleChange= event=>{
    const target = event.target;
    const value = target.type=== 'checkbox' ? target.checked : target.value;
    const name = event.target.name;
    console.log( `this is type: , this is name: ${name}, this is value:  ${value}`);
    this.setState({
        [name]: value
    }, this.filterRooms)
}

filterRoom= () =>{
    console.log('testing filter room function')
    let{ rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state
// all the rooms
    let tempRooms = [...rooms];
//transform value
capacity = parseInt( capacity )

    //filter by type
    if(type !== 'all'){
        tempRooms = tempRooms.filter(room => room.type === type)

    //filter by capacity
    if(capacity !== 1){
        tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    //Filter by Price
    tempRooms = tempRooms.filter(room => room.price <= price);
    
    //Filter by Price
    tempRooms = tempRooms.filter(room => room.sze >= minSize && room.size <= maxSize)

    //Filter By breakfast
       if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
       } 

    //Filter By pets
    if(pets){
        tempRooms = tempRooms.filter(room => room.pets === true)
   } 

    //Change State
    this.setState({
        sortedRoom : tempRooms
    })}

};
    render(){ 
        return(
        <RoomContext.Provider value={{...this.state, getRoom:this.getRoom, handleChange: this.handleChange}}>
            {this.props.children}
        </RoomContext.Provider>
            )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
        return function ConsumerWrapper(props){
            return <RoomConsumer >
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        }
}

export { RoomProvider, RoomConsumer, RoomContext};

