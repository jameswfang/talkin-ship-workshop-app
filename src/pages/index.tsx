"use client"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NavigationMenuDemo from '@/components/menu'
import Inventory from '@/components/inventory'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useFlags } from 'launchdarkly-react-client-sdk'
import BillingState from '@/components/status-toast'
import {useState, useEffect} from 'react'
import ErrorAlert from '@/pages/error-page'


const inter = Inter({ subsets: ['latin'] })
// initialize Apollo Client
  const client = new ApolloClient({
    uri: '/api',
    cache: new InMemoryCache()
  });


export default function Home() {
  //import flag values 
  const {enableStripe, storeEnabled} = useFlags();

  return (
    <>
    <ApolloProvider client={client}>
      <Head>
        <title>The Toggle Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/osmo.png" />
      </Head>
        <header className={styles.header}>
        <NavigationMenuDemo />
      </header>
      { storeEnabled ?
      <main className={styles.main}>
        <Image
        src = '/high-five.png'
        alt = 'Toggle'
        width = {250}
        height = {250}
        quality ={100}
        />
        <h1 className={inter.className}>Welcome to Toggle&apos;s Toggle Store!</h1>
        <div className={styles.center}>
          <Inventory />
        </div>
      </main>
      : <main className = {styles.main}>
        <div style={{position: 'absolute', textAlign:'center', height: '800px'}}>
        <Image
        src = '/high-five.png'
        alt = 'Toggle'
        width = {250}
        height = {250}
        quality ={100}
        />
        <h1 className={inter.className}>Welcome to Toggle&apos;s Toggles!</h1>
        <br></br>
        <h2 className={inter.className} style={{margin: 5}}>Hand-crafted, 100% organic toggles for all your jacket needs.</h2>
        <br></br>
        <Image
        src = '/toggle-1.jpg'
        alt = 'Toggle'
        width = {250}
        height = {250}
        quality ={100}
        style = {{padding: '20px'}}
        />
        <Image
        src = '/toggle-2.webp'
        alt = 'Toggle'
        width = {250}
        height = {250}
        quality ={100}
        style = {{padding: '20px'}}
        />
        <Image
        src = '/toggle-3.webp'
        alt = 'Toggle'
        width = {250}
        height = {250}
        quality ={100}
        style = {{padding: '20px'}}
        />
        <Image
        src = '/toggle-4.webp'
        alt = 'Toggle'
        width = {250}
        height = {250}
        quality ={100}
        style = {{padding: '20px'}}
        />
        <h3 className={inter.className} style={{margin: 5}}>For information about ordering our toggles, please contact <a href='mailto:thetogglestore@toggles.com' style={{color: 'blue'}}>thetogglestore@toggles.com</a></h3>
        </div>
      </main>}      
        <footer className={styles.footer} style={{justifyContent:'center'}}> 
        <BillingState />
        </footer>
  </ApolloProvider>
  </>
  )
  }
