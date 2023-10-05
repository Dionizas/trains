


@foreach ($comments as $comment)
    
    <div class="d-flex flex-row p-3" id="komentaras_{{$comment->id}}">
        <span class="d-inline-block komentarai-avatar me-3">{{ $comment->getInitialsAttribute() }}</span>
        <div class="w-100">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex flex-row align-items-center"> <span class="me-2">{{$comment->name}}</span> </div> <small>{{ $comment->created_at }}</small>
            </div>
            <p class="text-justify comment-text mb-0">{!! nl2br($comment->comment) !!}</p>

            @if (Auth::guest())

            @else
                <div class="d-flex flex-row">
                    <a href="{{ url('comment/'. $comment->id .'/delete') }}" class="btn btn-sm btn-danger proweb-lnk-x3">
                        <i class="bi bi-trash"></i> Pašalinti
                    </a>
                </div>
            @endif 

        </div>
    </div>


@endforeach

