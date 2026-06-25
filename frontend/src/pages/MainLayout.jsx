import NavbarComponent from "../components/NavbarComponent";



const MainLayout = ({children})=>{

  return(
    <div>
      <NavbarComponent/>
      <main>
      {children}
      </main>
    </div>
  )
}

export default MainLayout;