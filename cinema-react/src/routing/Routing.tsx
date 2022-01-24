import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateFilm from '../pages/films/create/createFilm';
import Films from '../pages/films/films';
import EditFilm from '../pages/films/id/Edit/Edit';
import FilmId from '../pages/films/id/FilmId';
import CreateHall from '../pages/hall/create/createHall';
import Hall from '../pages/hall/hall';
import EditHall from '../pages/hall/id/edit/HallEdit';
import HallId from '../pages/hall/id/HallId';
import CreateSeans from '../pages/seans/create/createSeans';
import SeansEdit from '../pages/seans/id/edit/SeansEdit';
import SeansId from '../pages/seans/id/SeansId';
import Seans from '../pages/seans/seans';
import TicketId from '../pages/ticket/id/TicketId';
import Tickets from '../pages/ticket/ticket';

export default function Routing() {
  return (
    <Switch>
      <Route path="/seans/:id/edit" exact>
        <SeansEdit />
      </Route>
      <Route path="/seans/create" exact>
        <CreateSeans />
      </Route>
      <Route path="/seans/:id" exact>
        <SeansId />
      </Route>
      <Route path="/seans" exact>
        <Seans />
      </Route>
      <Route path="/hall/:id/edit" exact>
        <EditHall />
      </Route>
      <Route path="/hall/create" exact>
        <CreateHall />
      </Route>
      <Route path="/hall/:id" exact>
        <HallId />
      </Route>
      <Route path="/hall" exact>
        <Hall />
      </Route>
      <Route path="/films/create" exact>
        <CreateFilm />
      </Route>

      <Route path="/films/:id/edit" exact>
        <EditFilm />
      </Route>
      <Route path="/films/:id" exact>
        <FilmId />
      </Route>
      <Route path="/films" exact>
        <Films />
      </Route>
      <Route path="/" exact>
        <Films />
      </Route>

      <Route path="/ticket/:id" exact>
        <TicketId/>
      </Route>
      <Route path="/tickets" exact>
        <Tickets/>
      </Route>
    </Switch>
  );
}
