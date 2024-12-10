<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class DayController extends Controller
{

    public function index()
    {
        $days = Day::orderBy('id', 'asc')->paginate(50);
        return view('days.index', compact('days'));
    }

    public static function list() {
        $days = Day::orderBy('id', 'asc')->paginate(50);
        return $days;
    }

    public function create()
    {
        return view('days.create');
    }


    public function store(Request $request)
    {
        Day::create($request->post());
        return redirect()->route('days.index')->with('success','Day has been created successfully.');
    }


    public function show(Day $day)
    {
        return view('days.show', compact('day'));
    }


    public function edit(Day $day)
    {
        return view('days.edit', compact('day'));
    }


    public function update(Request $request, Day $day)
    {
        $day->fill($request->post())->save();
        return redirect()->route('days.index')->with('success','Klausimas sėkmingai atnaujintas.');
    }


}
